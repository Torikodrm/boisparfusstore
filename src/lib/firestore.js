import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { connection } from "next/server";

const PRODUCTS_COLLECTION = "products";

/**
 * Queries puras (sin `connection()`), pensadas para usarse dentro de
 * boundaries `"use cache"` — por ejemplo `generateMetadata`.
 */
export async function fetchProducts() {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function fetchProductById(id) {
  const q = query(collection(db, PRODUCTS_COLLECTION), where("__name__", "==", id));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function fetchFeaturedProducts(count = 4) {
  const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"), limit(count));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/* ── Variantes request-time: esperan una petición real ─────────────── */

export async function getProducts() {
  await connection();
  return fetchProducts();
}

export async function getProductById(id) {
  await connection();
  return fetchProductById(id);
}

export async function getFeaturedProducts(count = 4) {
  await connection();
  return fetchFeaturedProducts(count);
}

export async function getProductsByFamily(family) {
  await connection();
  const products = await fetchProducts();
  return products.filter((p) => p.olfactoryFamily === family);
}

export async function getProductsByOccasion(occasion) {
  await connection();
  const products = await fetchProducts();
  return products.filter((p) => p.occasions?.includes(occasion));
}

export async function searchProducts(searchTerm) {
  await connection();
  const products = await fetchProducts();
  const term = searchTerm.toLowerCase();
  return products.filter(
    (p) =>
      p.name?.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term) ||
      p.olfactoryFamily?.toLowerCase().includes(term) ||
      p.olfactoryNotes?.top?.toLowerCase().includes(term) ||
      p.olfactoryNotes?.heart?.toLowerCase().includes(term) ||
      p.olfactoryNotes?.base?.toLowerCase().includes(term)
  );
}