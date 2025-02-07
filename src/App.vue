<template>
  <div style="width: 1000px; height: 600px;">
    <BMap ref="mapRef" v-bind="$attrs" :heading="30" :tilt="30" :zoom="12" :center="location.point || undefined"
      :displayOptions="{
        indoor: false,
        poi: true,
        skyColors: ['rgba(5, 5, 30, 0.01)', 'rgba(5, 5, 30, 1.0)']
      }" mapStyleId="980161f3645989feac25a0da15da4178" enableScrollWheelZoom @pluginReady="handlePluginReady" />
  </div>
</template>

<script setup>
import { useBrowserLocation } from 'vue3-baidu-map-gl'
import { onMounted, ref, useTemplateRef } from 'vue'
import data from './data.json'
import data2 from './data2.json'
const mapRef = useTemplateRef('mapRef')
const { location, get } = useBrowserLocation(null, () => {
  mapRef.value.resetCenter()
})

function handlePluginReady(map) {
  get()
  let view = new mapvgl.View({
    map: map
  })

  // const heatmap = new mapvgl.HeatmapLayer({
  //   size: 600, // 单个点绘制大小
  //   max: 40, // 最大阈值
  //   height: 0, // 最大高度，默认为0
  //   unit: 'm', // 单位，m:米，px: 像素
  //   gradient: { // 对应比例渐变色
  //     0.25: 'rgba(0, 0, 255, 1)',
  //     0.55: 'rgba(0, 255, 0, 1)',
  //     0.85: 'rgba(255, 255, 0, 1)',
  //     1: 'rgba(255, 0, 0, 1)'
  //   }
  // });

  let grid = new mapvgl.HeatGridLayer({
    max: 80, // 最大阈值
    min: 10, // 最小阈值
    gridSize: 500,
    gradient: {
      // 对应比例渐变色
      0: 'rgb(50, 50, 256)',
      0.3: 'rgb(178, 202, 256)',
      1: 'rgb(250, 250, 256)'
    },
    riseTime: 1800, // 楼块初始化升起时间
    maxHeight: 10000, // 最大高度
    minHeight: 200 // 最小高度
  })
  view.addLayer(grid)
  grid.setData(data2)
  // view.addLayer(heatmap)
  // heatmap.setData(data2)
}



// onMounted(() => {
//   data2.forEach((val, index, arr) => {
//     arr[index]['properties']['count'] = 1
//   })
//   console.log(data2)
// })

</script>
