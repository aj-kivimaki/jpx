#!/usr/bin/env zsh
# Lightweight secret scanner for staged files.
# Exits with non-zero if a likely secret is found.

set -euo pipefail

PATTERN='(API[_-]?KEY|SECRET|PRIVATE[_-]?KEY|BEGIN\s+PRIVATE\s+KEY|PASSWORD|passwd|token|access[_-]?token)'

# Get staged files (added/modified/copied)
files=$(git diff --cached --name-only --diff-filter=ACM)

[[ -z "$files" ]] && exit 0

matches=0

for f in $files; do
  # Only scan regular files
  if [[ -f "$f" ]]; then
    case "$f" in
      # Ignore common binary formats
      *.png|*.jpg|*.jpeg|*.gif|*.svg|*.ico|*.pdf|*.webp|*.avif|*.woff|*.woff2|*.ttf|*.otf)
        continue
        ;;

      # Ignore node_modules
      node_modules/*)
        continue
        ;;

      # Default case (required by linters)
      *)
        ;;
    esac

    # Run secret detection
    if grep -nE -- "$PATTERN" -- "$f" >/dev/null 2>&1; then
      echo "⚠️  Potential secret found in staged file: $f"
      grep -nE -- "$PATTERN" -- "$f" || true
      matches=$((matches + 1))
    fi
  fi
done

if [[ $matches -gt 0 ]]; then
  echo "\n❌ Secret scan failed: found $matches potential matches."
  echo "Review before committing."
  echo "If these are false positives, adjust the script or add explicit exceptions."
  exit 1
fi

exit 0
