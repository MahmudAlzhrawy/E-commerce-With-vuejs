#!/User/bin/evn sh

set - e
npm run build
cd dist
git init
git add - A
git commit - m 'new'
git push - f git @github.com: MahmudAlzhrawy / Z - Store.git master: gh - pages
cd -