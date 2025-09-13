export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold text-green-700">DeManoEnMano</h1>
        <nav className="flex gap-4">
          <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Iniciar Sesión
          </a>
          <a href="/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Registrarse
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-5xl font-bold text-green-800 mb-6">Dona objetos, ayuda a quienes lo necesitan</h2>
        <p className="text-gray-700 text-lg max-w-2xl mb-8">
          Desaste de lo que ya no uses y al mismo tiempo ayuda a alguien. Comparte, reutiliza y genera un impacto positivo en tu comunidad.
        </p>
      </section>

      {/* Cómo Funciona */}
      <section className="bg-white py-16 px-6">
        <h3 className="text-3xl font-bold text-center text-green-800 mb-10">¿Cómo Funciona?</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-700">
          <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">1. Regístrate</h4>
            <p>Crea tu cuenta como usuario y accede a la plataforma de manera segura.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">2. Publica objetos</h4>
            <p>Sube objetos que ya no necesitas y descríbelos para que otros puedan solicitarlos.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">3. Solicita objetos</h4>
            <p>Explora los objetos disponibles y solicita los que te interesen de manera sencilla.</p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">4. Supervisión segura</h4>
            <p>Los administradores verifican las publicaciones para garantizar seguridad y calidad.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white text-center py-6 mt-16">
        <p> Tarea: Crear Sitio Web. Autor: Nuñez Gonzalez Alexis Damian </p>
      </footer>
    </div>
  );
}
