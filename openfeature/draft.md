# OpenFeature Flag Documentation

## Feature: Popular Products

**Flag Key**: `popular-products`
**Type**: Release Feature (with variations)
**Default Variation**: `show-none`
**Description**: Controls the Popular Products section and its border styling via three variations.

### Variations

- `show-both`: Show the products and the border
- `show-none`: Hide products and border
- `show-products-only`: Show products without the border

### Variables

- `show-popular-products` (Boolean): Whether to render the Popular Products section
- `show-popular-product-border` (Boolean): Whether to render the highlighted border around the section

### Frontend Usage (OpenFeature)

```typescript
import { useBooleanFlagValue } from "@openfeature/react-sdk"

const showPopularProducts = useBooleanFlagValue("show-popular-products", false)
const showPopularProductBorder = useBooleanFlagValue(
  "show-popular-product-border",
  false
)
```

### Components Using This Feature

- Home page `src/app/page.tsx`

## Feature: Admin Product Management

**Flag Key**: `enable-admin-product-management`
**Type**: Boolean
**Default**: false
**Description**: Controls visibility of admin product management features including price and quantity updates

### Frontend Usage:

```typescript
const { value: enableAdminProductManagement } = useBooleanFlag(
  "enable-admin-product-management",
  false
)
```

### Components Using This Flag:

- AdminProductManagement
- AdminPage
- ProductUpdateForm

## Feature: Admin Product Bulk Actions

**Flag Key**: `enable-admin-bulk-actions`
**Type**: Boolean
**Default**: false
**Description**: Controls visibility of bulk edit actions for products (bulk price updates, bulk quantity updates)

### Frontend Usage:

```typescript
const { value: enableBulkActions } = useBooleanFlag(
  "enable-admin-bulk-actions",
  false
)
```

### Components Using This Flag:

- AdminProductManagement
- BulkEditModal

## Feature: Admin Product Filters

**Flag Key**: `enable-admin-product-filters`
**Type**: Boolean
**Default**: false
**Description**: Controls advanced filtering and sorting options in admin product management

### Frontend Usage:

```typescript
const { value: enableAdvancedFilters } = useBooleanFlag(
  "enable-admin-product-filters",
  false
)
```

### Components Using This Flag:

- AdminProductManagement
- ProductFilterControls
