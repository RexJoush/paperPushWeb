<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的字数</span>
        <el-button style="float: right;" type="primary" @click="dialogVisible=true">添加今日进度</el-button>
      </div>
      <el-table :data="data" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column label="字数" align="center">
          <template v-slot="scope">
            <el-tag>{{ scope.row.words }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="日期" prop="date" align="center" />
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="editRecord(scope.row.id, scope.row.words)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delRecord(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        @current-change="onChangePage">
      </el-pagination>
    </el-card>

    <el-dialog
      title="今日字数"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="字数">
          <el-input v-model="words" type="number" suffix-icon="el-icon-circle-plus" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑今日字数"
      :visible.sync="dialogEditVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="字数">
          <el-input v-model="edit.words" type="number" suffix-icon="el-icon-circle-plus" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRecordSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editRecord, listRecord, delRecord, addRecord } from '@/api/record'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogEditVisible: false,
      total: 20, // 总数据量
      words: '', // 字数
      data: [],
      edit: {
        id: '',
        words: ''
      }
    }
  },
  created() {
    listRecord(1, 10).then(res => {
      this.total = res.data.total
      this.data = res.data.records
    })
  },
  methods: {
    // 编辑字数
    editRecord(id, words) {
      this.edit.id = id
      this.edit.words = words
      this.dialogEditVisible = true
    },

    // 提交编辑
    editRecordSubmit() {
      editRecord(this.edit.id, this.edit.words).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.message)
          this.onChangePage(1)
        } else {
          this.$message.error(res.message)
        }
        this.dialogEditVisible = false
        this.created()
      })
    },
    // 删除字数
    delRecord(id) {
      this.$confirm('确认删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        delRecord(id).then(res => {
          if (res.code === 20000) {
            this.$message.success(res.message)
            this.onChangePage(1)
          } else {
            this.$message.error(res.message)
          }
          this.words = ''
          this.created()
        })
      })
    },
    // 提交添加
    onSubmit() {
      this.$confirm('确认添加？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        addRecord(this.words).then(res => {
          this.dialogVisible = false
          if (res.code === 20000) {
            this.$message.success(res.message)
            this.onChangePage(1)
          } else {
            this.$message.error(res.message)
          }
          this.words = ''
          this.created()
        })
      })
    },
    // 分页
    onChangePage(page) {
      listRecord(page, 10).then(res => {
        this.total = res.data.total
        this.data = res.data.records
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
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
