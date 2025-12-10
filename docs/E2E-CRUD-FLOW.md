[⬅ Back to Root README](../README.md#documentation) | [Architecture](./ARCHITECTURE.md) | [CI/CD](./CI-CD.md) | [Error Logging](./ERROR-LOGGING.md) | [I18N](./I18N.md) | [Pre-Hooks](./PRE-HOOKS.md)

# End-to-End Gig CRUD Lifecycle Documentation

This document shows the complete lifecycle of Gig operations in the
app --- including:

- **loading**
- **creating**
- **updating**
- **deleting**
- **error handling**
- **logging**
- **React Query cache invalidation**
- **UI toast feedback**

---

## 1. App Error Propagation & Logging Flow

```mermaid
flowchart LR
    %% Start points
    A[Supabase / API Error] --> B["React Query queryFn / fetchGigs"]
    C[Zod Validation Error] --> D["React Hook Form + zodResolver"]
    E[Unknown JS Error] --> F["Try/Catch Blocks"]

    %% Error handling
    B --> G["Convert to AppError via makeError()"]
    D --> H["mapAppErrorToFormErrors → field-level errors"]
    F --> G

    %% Logging
    G --> I["logger.error() / logDbError()"]
    H --> I

    %% UI feedback
    I --> J["UI Toast via useToastify"]
    H --> J

    %% React Query central handling
    B --> K["React Query QueryCache / MutationCache"]
    F --> K
    K --> I

    %% Notes
    classDef note fill:#f9f,stroke:#333,stroke-width:1px,color:#000;
    J:::note
    I:::note
    K:::note
```

### Summary

This flow demonstrates how **all errors**---from Supabase, Zod, or
unknown JS exceptions---are normalized into `AppError`, logged, routed
into React Query's caches if appropriate, and surfaced to the user via
toasts or form field errors.

---

## 2. Gig Form Validation & Submission Flow

```mermaid
flowchart TD
    A[User submits gig form] --> B[Validate input via Zod schemas]
    B --> C{Validation OK?}
    C -- No --> D[Throw AppError: VALIDATION_ERROR]
    C -- Yes --> E[Call Supabase CRUD function - create/update/delete/get]
    E --> F{Supabase returns error?}
    F -- Yes --> G[Call logDbError for logging]
    G --> H[Throw AppError: DB_ERROR]
    F -- No --> I{Supabase returns valid data?}
    I -- No --> J[Throw AppError: UNKNOWN or NOT_FOUND]
    I -- Yes --> K[Return validated data to UI]
    K --> L[Show toast - success or error]
```

### Summary

This diagram illustrates how form submission moves through validation →
Supabase CRUD → error normalization → toast feedback. It also shows how
both validation and DB errors are handled consistently.

---

## 3. Client--Server Data Flow (React Query + Supabase)

```mermaid
flowchart TD
    subgraph DB
        A[Supabase DB]
    end

    subgraph Client
        B[fetchGigs / fetchLineupOptions]
        C[React Query queryFn]
        D[useGigFormState / useGigLoader]
        E[useGigSubmit]
        F[Form / UI]
        G[useToastify]
        H[AppError]
        I[logDbError / logger]
    end

    A --> B
    B --> C
    C -->|success| D
    C -->|error| H
    H --> I
    H -->|validation| D
    D --> F
    E -->|submit| B
    E -->|error| H
    H --> G
    F --> G
```

### Summary

This diagram shows how gig data travels from Supabase through React
Query into UI components, and how errors propagate back upward to the
logger and toast notifications.

---

## 4. End-to-End Gig CRUD Lifecycle (Load, Create, Update, Delete)

```mermaid
flowchart TD

    %% =========================================
    %% LOAD ALL GIGS (List page)
    %% =========================================
    A[Page loads gig list] --> B[Call fetchGigs]

    B --> C{fetchGigs success}
    C -- No --> D[Throw AppError DB_ERROR]
    C -- Yes --> E[Render gigs list]


    %% =========================================
    %% CREATE / UPDATE (Form submit)
    %% =========================================
    F[User submits gig form] --> G{Is form valid?}

    G -- No --> H[Throw AppError VALIDATION_ERROR]
    G -- Yes --> I{Is edit mode?}

    I -- No --> J[Call createGig]
    I -- Yes --> K[Call updateGig]

    J --> L{createGig success?}
    K --> M{updateGig success?}

    L -- No --> N[Throw AppError DB_ERROR]
    L -- Yes --> O[Return created gig]

    M -- No --> P[Throw AppError DB_ERROR]
    M -- Yes --> Q[Return updated gig]


    %% =========================================
    %% DELETE FLOW (Modal confirm)
    %% =========================================
    R[User confirms delete] --> S[Call deleteGig]

    S --> T{deleteGig success?}
    T -- No --> U[Throw AppError DB_ERROR]
    T -- Yes --> V[Return true]


    %% =========================================
    %% CACHE INVALIDATION
    %% =========================================
    O --> W[Invalidate gigs query cache]
    Q --> W
    V --> W


    %% =========================================
    %% TOASTS
    %% =========================================
    W --> X[Show toast SUCCESS]

    H --> Y[Show toast ERROR]
    N --> Y
    P --> Y
    U --> Y
    D --> Y
```

### Summary

This final diagram integrates everything into a complete Gig CRUD
lifecycle:

- **List page loading**
- **Create & update via the form**
- **Delete via the confirmation modal**
- **Centralized error processing**
- **React Query cache invalidation**
- **Success/error toasts**

---

# Conclusion

Together, these diagrams form a complete system overview of **Gig CRUD
logic, error architecture, validation, logging, and UI feedback**.
