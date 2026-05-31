import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_FILE_PATH = path.join(__dirname, 'public', 'data.json')

// Native CMS Local API Middleware for Postman Administration
const cmsPlugin = () => ({
  name: 'vite-plugin-sercotec-cms',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.startsWith('/api/content')) {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')

        if (req.method === 'OPTIONS') {
          res.statusCode = 200
          res.end()
          return
        }

        if (req.method === 'GET') {
          try {
            if (fs.existsSync(DATA_FILE_PATH)) {
              const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8')
              res.statusCode = 200
              res.end(data)
            } else {
              res.statusCode = 404
              res.end(JSON.stringify({ error: 'data.json no encontrado' }))
            }
          } catch (error) {
            console.error('Error al leer el archivo de base de datos:', error)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'No se pudo leer el archivo de base de datos' }))
          }
          return
        }

        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            try {
              const parsedBody = JSON.parse(body)
              let currentData = {}
              if (fs.existsSync(DATA_FILE_PATH)) {
                currentData = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'))
              }

              // Route dispatcher
              if (req.url === '/api/content/news') {
                if (!currentData.noticias) currentData.noticias = []
                const newArticle = {
                  id: `n-${Date.now()}`,
                  fecha: new Date().toLocaleDateString('es-CL', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  }),
                  ...parsedBody
                }
                currentData.noticias.unshift(newArticle)
                fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(currentData, null, 2), 'utf-8')
                res.statusCode = 201
                res.end(JSON.stringify({ status: 'success', message: 'Noticia agregada exitosamente', item: newArticle }))
              } 
              else if (req.url === '/api/content/faq') {
                if (!currentData.faq) currentData.faq = []
                const newFaq = {
                  id: `faq-${Date.now()}`,
                  ...parsedBody
                }
                currentData.faq.push(newFaq)
                fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(currentData, null, 2), 'utf-8')
                res.statusCode = 201
                res.end(JSON.stringify({ status: 'success', message: 'FAQ agregada exitosamente', item: newFaq }))
              }
              else if (req.url === '/api/content/videos') {
                if (!currentData.videos) currentData.videos = []
                const newVideo = {
                  id: `v-${Date.now()}`,
                  ...parsedBody
                }
                currentData.videos.push(newVideo)
                fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(currentData, null, 2), 'utf-8')
                res.statusCode = 201
                res.end(JSON.stringify({ status: 'success', message: 'Video agregado exitosamente', item: newVideo }))
              }
              else if (req.url === '/api/content') {
                const updatedData = { ...currentData, ...parsedBody }
                fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), 'utf-8')
                res.statusCode = 200
                res.end(JSON.stringify({ status: 'success', message: 'Base de datos del CMS actualizada completamente' }))
              }
              else {
                res.statusCode = 404
                res.end(JSON.stringify({ error: 'Endpoint del CMS no encontrado' }))
              }
            } catch (err) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Carga útil JSON inválida o error del sistema', details: err.message }))
            }
          })
          return
        }
      }
      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cmsPlugin()],
})
