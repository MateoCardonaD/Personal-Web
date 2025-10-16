export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          404 - Página no encontrada
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          La página que buscas no existe
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  )
}


