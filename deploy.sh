set -e
npm run build

# 进入打包文件夹准备打包
cd dist

git add -A
git commit -m 'deploy'

git push origin gh-pages