"use client";

export default function Footer() {
  return (
    <footer className="text-center py-6 border-t text-gray-500 text-sm bg-white">
      © {new Date().getFullYear()} Wszelkie prawa zastrzeżone
    </footer>
  );
}
