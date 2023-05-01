import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//vite3.1.x 不支持commonJS写法
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = resolve(__dirname, './src')

export default defineConfig({
  resolve:{
    alias:{
      '@': pathSrc
    }
  },
  css:{
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "./src/style/base.less";`,
        },
        javascriptEnabled: true,
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      //自动导入vue相关函数 ref reactive toRef 等....
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        }),
      ],
      dts: resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        }),
      ],
      dts: resolve(pathSrc, 'components.d.ts')
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    })
  ]
})

