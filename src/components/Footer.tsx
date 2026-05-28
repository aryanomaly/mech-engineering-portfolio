import { Cog, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cog className="h-5 w-5 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">
              Mechanical Engineering Portfolio
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-slate-400">
            Built for placement preparation. All projects demonstrate real engineering skills.
          </p>
        </div>
      </div>
    </footer>
  )
}
