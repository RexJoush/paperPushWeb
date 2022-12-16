<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进展情况</span>
        <el-button style="float: right;" type="warning" @click="dialogDeadlineVisible=true;updateDate=deadlineDate">修改截止日期</el-button>
        <el-button style="float: right; margin-right: 10px;" type="primary" @click="dialogTargetVisible=true;updateDate=deadlineDate">修改目标字数</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4">
          <div>
            <el-statistic :value="moreThanLastTime" :title="title">
              <template slot="prefix">
                <i class="el-icon-s-flag" style="color: red" />
              </template>
              <template slot="formatter">
                {{ moreThanLastTime.toFixed(0) }} 字
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic :value="deadline" format="HH 小时 mm 分钟 ss 秒" time-indices>
              <template slot="title">
                论文上交 Deadline  <span style="color: orangered">{{ deadlineDate }}</span>
              </template>
              <template slot="prefix">
                <i class="el-icon-alarm-clock" style="color: red" />
              </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
      <el-divider content-position="left">百分比</el-divider>
      <el-row>
        <el-col :span="13">
          <div>
            <el-progress :text-inside="true" color="#3E6D9C" :stroke-width="26" text-color="#e6a23c" :percentage="percentage"></el-progress>
          </div>
        </el-col>
        <el-col :span="3">
          <el-statistic style="color: #FD841F">
            <template slot="title">
              <el-tag size="small">{{ now }} / {{ target }}</el-tag>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
    </el-card>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的论文进展</span>
          </div>
          <div ref="chart" style="height: 500px; width: 100%" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 截至日期修改框 -->
    <el-dialog
      title="修改截至日期"
      :visible.sync="dialogDeadlineVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="截至日期">
          <el-date-picker
            v-model="updateDate"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeadlineVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateDeadline">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改目标字数"
      :visible.sync="dialogTargetVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="目标字数">
          <el-input v-model="target" type="number" suffix-icon="el-icon-circle-plus" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTargetVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateTarget">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { initMyGraph, updateDeadline, updateTarget } from '@/api/statistics'

export default {
  data() {
    return {
      like: true,
      percentage: 0,
      title: '相比于上次多写了',
      moreThanLastTime: 0,
      deadline: '',
      deadlineDate: '',
      updateDate: '',
      now: 0,
      target: 0,
      dialogDeadlineVisible: false,
      dialogTargetVisible: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    submitUpdateDeadline() {
      updateDeadline(this.updateDate).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.message)
          this.init()
        } else {
          this.$message.error(res.message)
        }
        this.dialogDeadlineVisible = false
        this.mounted()
      })
    },
    submitUpdateTarget() {
      updateTarget(this.target).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.message)
          this.init()
        } else {
          this.$message.error(res.message)
        }
        this.dialogTargetVisible = false
        this.mounted()
      })
    },
    // 获取初始数据
    init() {
      initMyGraph().then((res) => {
        console.log(res)
        let last = 0
        if (res.data.series.length < 1) {
          this.moreThanLastTime = 0
        } else if (res.data.series.length < 2) {
          this.moreThanLastTime = res.data.series[0]
          last = res.data.series.at(-1)
        } else {
          this.moreThanLastTime = (res.data.series.at(-1) - res.data.series.at(-2))
          last = res.data.series.at(-1)
        }
        this.now = last
        this.percentage = last / res.data.target * 100
        this.target = res.data.target
        this.deadlineDate = res.data.deadline
        this.deadline = new Date(res.data.deadline).getTime()
        const chart = this.$refs.chart
        if (chart) {
          const myChart = this.$echarts.init(chart)
          const option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: res.data.xAxis,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '字数',
                type: 'bar',
                barWidth: '60%',
                data: res.data.series
              }
            ]
          }
          myChart.setOption(option, null, { renderer: 'svg' })
        }
      })
    }
  }
}
</script>

<style scoped>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  margin-top: 1%;
  margin-left: 2%;
  width: 96%;
}
</style>

