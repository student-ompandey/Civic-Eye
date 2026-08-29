# Civic Eye Database Schema — MongoDB

We utilize MongoDB to store user profiles and reported civic issues, while Supabase manages authentication. The user profile document is linked to the Supabase Auth system using the Supabase `user.id`.

---

## 1. `profiles` Collection

Stores supplementary profile details for registered citizens.

### Document Schema

```json
{
  "_id": "ObjectId",
  "id": "String",          // Matches Supabase auth.users.id (UID)
  "full_name": "String",   // User's first and last name
  "avatar_url": "String",  // URL path to public profile image or null
  "created_at": "Date"     // Timestamp of profile registration
}
```

### TypeScript Definition

```typescript
export interface UserProfile {
  _id?: string;
  id: string; // Supabase auth UID
  full_name: string;
  avatar_url: string | null;
  created_at: Date;
}
```

### Indexes

To ensure high performance and data integrity:
- **`id` index**: Unique index on `id` to enforce that each Supabase user has exactly one MongoDB profile document.
  ```javascript
  db.collection('profiles').createIndex({ id: 1 }, { unique: true });
  ```
