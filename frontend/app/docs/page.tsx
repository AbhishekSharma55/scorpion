'use client';

import { ExternalLink, Database, Zap, Palette, FileText } from 'lucide-react';

interface Service {
  name: string;
  description: string;
  url: string;
  port: number;
  icon: React.ReactNode;
  color: string;
  status: 'running' | 'loading';
}

const services: Service[] = [
  {
    name: 'Frontend',
    description: 'Next.js development server with hot reload',
    url: 'http://localhost:3001',
    port: 3001,
    icon: <Palette className="w-6 h-6" />,
    color: 'bg-blue-500',
    status: 'running',
  },
  {
    name: 'PostgREST API',
    description: 'Auto-generated REST API from PostgreSQL',
    url: 'http://localhost:5000',
    port: 5000,
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-yellow-500',
    status: 'running',
  },
  {
    name: 'PostgreSQL Database',
    description: 'Database with pgAdmin for management',
    url: 'localhost:5436',
    port: 5436,
    icon: <Database className="w-6 h-6" />,
    color: 'bg-green-500',
    status: 'running',
  },
  {
    name: 'pgAdmin',
    description: 'PostgreSQL management interface',
    url: 'http://localhost:5050',
    port: 5050,
    icon: <Database className="w-6 h-6" />,
    color: 'bg-emerald-600',
    status: 'running',
  },
  {
    name: 'Swagger UI',
    description: 'API documentation and testing',
    url: 'http://localhost:8080',
    port: 8080,
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-orange-500',
    status: 'running',
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Scorpion Services</h1>
          <p className="text-gray-400 text-lg">Local development environment dashboard</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <a
              key={service.name}
              href={service.url.startsWith('http') ? service.url : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
            >
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 h-full flex flex-col">
                {/* Icon and Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`${service.color} p-3 rounded-lg text-white`}>
                    {service.icon}
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-gray-400 uppercase">{service.status}</span>
                  </span>
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{service.description}</p>

                {/* Port Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono bg-slate-700 text-gray-300 px-3 py-1 rounded">
                    Port {service.port}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Links Section */}
        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-300 mb-3">📝 Login Credentials</h3>
              <div className="space-y-2 text-sm text-gray-400 font-mono bg-slate-900 p-4 rounded">
                <div>
                  <span className="text-gray-500">pgAdmin Email:</span>
                  <span className="text-white ml-2">admin@example.com</span>
                </div>
                <div>
                  <span className="text-gray-500">pgAdmin Password:</span>
                  <span className="text-white ml-2">admin</span>
                </div>
                <div>
                  <span className="text-gray-500">Database User:</span>
                  <span className="text-white ml-2">app_user</span>
                </div>
                <div>
                  <span className="text-gray-500">Database Password:</span>
                  <span className="text-white ml-2">password</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-300 mb-3">🔗 Connection Info</h3>
              <div className="space-y-2 text-sm text-gray-400 font-mono bg-slate-900 p-4 rounded">
                <div>
                  <span className="text-gray-500">Database Host:</span>
                  <span className="text-white ml-2">localhost</span>
                </div>
                <div>
                  <span className="text-gray-500">Database Port:</span>
                  <span className="text-white ml-2">5436</span>
                </div>
                <div>
                  <span className="text-gray-500">Database Name:</span>
                  <span className="text-white ml-2">app_db</span>
                </div>
                <div>
                  <span className="text-gray-500">API Base URL:</span>
                  <span className="text-white ml-2">http://localhost:5000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>All services are running in development mode with hot reload enabled</p>
        </div>
      </div>
    </main>
  );
}
