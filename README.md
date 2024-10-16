# Cloud Firestore Controller

This library makes it easy to operate the Cloud Firestore with short code.

## Requirements

- Node.js v20.0.0 or later
- [Cloud Firestore: Node.js Client (@google-cloud/firestore)](https://www.npmjs.com/package/@google-cloud/firestore) v7.0.0 or later

## Example

### Read Document

Before:

```typescript
const doc = await firestore.collection("users").doc("user1").get();
const data = doc.data();

console.log(data);
```

After:

```typescript
const data = await readDoc("users", "user1");

console.log(data);
```

### Write Document

Before:

```typescript
const data = { name: "Alice", age: 20, email: "alice@example.ne.jp" };

await firestore.collection("users").doc("user1").set(data);
```

After:

```typescript
const data = { name: "Alice", age: 20, email: "alice@example.ne.jp" };

await writeDoc("users", "user1", data);
```

### Files

- [decodeServiceAccount.ts](./lib/decodeServiceAccount.ts) - Decode base64 encoded service account key.
- [firestoreController.ts](./lib/firestoreController.ts) - Main library file.
