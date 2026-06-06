## 2024-06-06 - [React Memoization]
**Learning:** In lists with complex items, toggling state in the parent component causes all items to re-render.
**Action:** Extract list items into separate components and wrap them in `React.memo`, passing callbacks wrapped in `useCallback` to prevent unnecessary re-renders. Moving static logic (like color maps) outside the component also avoids recreation on every render.
