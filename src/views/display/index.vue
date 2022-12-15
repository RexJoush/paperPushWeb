<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>论文统计字数</span>
      </div>
      <div ref="chart" style="height: 500px; width: 100%" />
    </el-card>
  </div>
</template>

<script>
import { initGraph } from '@/api/display'
export default {
  data() {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      initGraph().then((res) => {
        console.log(res)
        const chart = this.$refs.chart
        if (chart) {
          const myChart = this.$echarts.init(chart)
          const names = res.data.names
          const datasetWithFilters = []
          const seriesList = []
          this.$echarts.util.each(names, function(name) {
            const datasetId = 'dataset_' + name
            datasetWithFilters.push({
              id: datasetId,
              fromDatasetId: 'dataset_raw',
              transform: {
                type: 'filter',
                config: {
                  and: [
                    { dimension: 'Name', '=': name }
                  ]
                }
              }
            })
            seriesList.push({
              type: 'line',
              datasetId: datasetId,
              showSymbol: false,
              name: name,
              endLabel: {
                show: true,
                formatter: function(params) {
                  return params.value[2] + ': ' + params.value[1]
                }
              },
              labelLayout: {
                moveOverlap: 'shiftY'
              },
              emphasis: {
                focus: 'series'
              },
              encode: {
                x: 'Year',
                y: 'Words',
                label: ['Name', 'Words'],
                itemName: 'Year',
                tooltip: ['Words']
              }
            })
          })
          const option = {
            animationDuration: 2000,
            dataset: [
              {
                id: 'dataset_raw',
                source: res.data.series
              },
              ...datasetWithFilters
            ],
            // title: {
            //   text: '论文字数统计'
            // },
            tooltip: {
              order: 'valueDesc',
              trigger: 'axis'
            },
            legend: {
              data: res.data.names
            },
            xAxis: {
              type: 'time',
              nameLocation: 'middle',
              formatter: '{yyyy}-{MM}-{dd}'
            },
            yAxis: {
              name: 'Words'
            },
            grid: {
              right: 140
            },
            series: seriesList
          }
          myChart.setOption(option, null, { renderer: 'svg' })
        }
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.box-card {
  margin-top: 1%;
  margin-left: 2%;
  width: 96%;
}
</style>

