# OpenFeature Flag Documentation

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
