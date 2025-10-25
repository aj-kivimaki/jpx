#!/bin/bash

echo "Checking import file cases..."

# Loop through all .tsx files in src/components
for FILE in $(find frontend/src/components -type f -name "*.tsx"); do
  # Extract import paths from './components/...'
  IMPORTS=$(grep -oE "from\s+'\.\/components\/[^']+'" "$FILE" | sed "s/from\s\+'.\/components\///; s/'//")
  
  for IMPORT in $IMPORTS; do
    if [ ! -f "frontend/src/components/${IMPORT}.tsx" ] && [ ! -f "frontend/src/components/${IMPORT}.ts" ]; then
      echo "⚠️  Possible mismatch in $FILE: '$IMPORT' does not match any file in components/"
    fi
  done
done

echo "Check complete."
