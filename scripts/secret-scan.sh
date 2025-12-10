#!/usr/bin/env zsh
# Lightweight secret scanner for staged files.
# Exits with non-zero if a likely secret is found.

set -euo pipefail

PATTERN='(API[_-]?KEY|SECRET|PRIVATE[_-]?KEY|BEGIN\s+PRIVATE\s+KEY|PASSWORD|passwd|token|access[_-]?token)'

# Get staged files (added/modified/copied)
files=$(git diff --cached --name-only --diff-filter=ACM)

if [[ -z "$files" ]]; then
  exit 0
fi

matches=0
for f in $files; do
  # Only scan text files reasonably
  if [[ -f $f ]]; then
    # ignore binary and node_modules paths
    case "$f" in
      *.png|*.jpg|*.jpeg|*.gif|*.svg|*.ico|*.pdf|node_modules/*) continue ;;
    esac

    if grep -nE -- "$PATTERN" -- "$f" >/dev/null 2>&1; then
      echo "Potential secret found in staged file: $f"
      grep -nE -- "$PATTERN" -- "$f" || true
      matches=$((matches+1))
    fi
  fi
done

if [[ $matches -gt 0 ]]; then
  echo "\nSecret scan failed: found $matches potential matches. Review before committing."
  echo "If these are false positives, adjust the script or add explicit exceptions."
  exit 1
fi

exit 0
