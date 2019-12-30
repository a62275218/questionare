set -e
npm run build

# 进入打包文件夹准备打包
git add -A
git subtree push -f --prefix=dist origin gh-pages