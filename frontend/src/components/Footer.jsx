function Footer() {
  return (
    <footer className="bg-pink-200 text-pink-700 text-center p-4 shadow-inner">
      <p className="text-sm">
        © {new Date().getFullYear()} Scoopify 🍦 | Made with ❤️ for ice‑cream lovers
      </p>
    </footer>
  );
}

export default Footer;