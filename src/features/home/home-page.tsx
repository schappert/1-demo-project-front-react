export const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Application de Démo
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    Gestion de tâches et utilisateurs avec React, Redux et React Query.
                    Déploiement automatisé sur Vercel, backend en NestJS sur VPS.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Technos Frontend</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>React (TSX + Hooks)</li>
                        <li>Redux Toolkit</li>
                        <li>React Query pour le caching et la gestion des requêtes</li>
                        <li>Vite pour le build rapide</li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Backend</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>NestJS (Node.js)</li>
                        <li>JWT pour l’authentification</li>
                        <li>API REST pour gérer utilisateurs et tâches</li>
                        <li>Hébergement sur VPS avec PM2 et déploiement automatisé via GitHub Webhook</li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Déploiement & CI/CD</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Frontend hébergé sur Vercel</li>
                        <li>Backend hébergé sur VPS</li>
                        <li>Déploiement automatisé via GitHub webhook et PM2</li>
                        <li>HTTPS activé avec Certbot / Nginx reverse proxy</li>
                    </ul>
                </div>
            </section>

            <section className="mt-12 bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fonctionnalité</h2>
                <p className="text-gray-700 leading-relaxed">
                    Cette mini application permet de gérer les utilisateurs et leurs tâches.
                    Chaque tâche peut être assignée à un ou plusieurs utilisateurs et le frontend
                    utilise React Query pour synchroniser et mettre en cache les données de manière réactive.
                    Le backend NestJS expose des endpoints sécurisés avec JWT.
                </p>
            </section>
        </div>
    );
};

