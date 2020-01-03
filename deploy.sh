set -e
npm run build

# 进入打包文件夹准备打包
git add .
git commit -m "发布"
git subtree push --prefix=dist origin gh-pages