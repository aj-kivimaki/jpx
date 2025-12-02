# `/shared`

## Build is required before building apps that consume it

```bash
# Build shared package
npm run build:shared

# In case of errors
npm run clean:shared # removes tsconfig.tsbuildinfo
npm run build:shared
```
