# Leaderboard Web - Proyecto (Next.js + Supabase)

Instrucciones rápidas:

1. Crea un proyecto en Supabase.
2. Ejecuta `sql/supabase_schema.sql` en SQL editor.
3. Obtén `SUPABASE_URL`, `ANON_KEY` y `SERVICE_ROLE_KEY`.
4. En Vercel (o local .env), añade:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY

Despliegue:
- Subir este repo a GitHub.
- Conectar a Vercel y desplegar.

Admin:
- /admin/results -> formulario para introducir resultados (protegido con credenciales de Supabase Auth si lo configuras).

