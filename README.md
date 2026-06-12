# ECO文档管理系统

## 项目概述
ECO（Engineering Change Order）文档管理系统是一个Web应用，用于管理和预览各种格式的工程文档。系统支持三个专业领域：
- 📱 电子（Electronics）
- ⚙️ 机械（Mechanical）
- 💻 软件（Software）

## 主要功能

### 1. 文档管理
- ✅ 支持多个专业的文档分类
- ✅ 文件上传和下载
- ✅ 文件删除
- ✅ 按专业过滤文档

### 2. 文件预览
- ✅ 图片预览（JPG, PNG, GIF等）
- ✅ PDF在线预览
- ✅ Office文档预览（使用Office Online）
- ✅ 文本文件预览
- ✅ CAD和Solidworks文件信息显示

### 3. 版本管理
- ✅ 自动记录文件上传日期
- ✅ 版本历史追踪
- ✅ 版本变更说明
- ✅ 版本下载

### 4. 本地文件读写
- ✅ 使用JSON格式存储数据
- ✅ 本地文件上传和存储
- ✅ 支持多格式文件

## 技术栈

### 前端
- Vue 3
- Vite
- Element Plus（UI组件库）
- Axios（HTTP客户端）

### 后端
- Node.js + Express
- Multer（文件上传处理）
- 本地JSON数据库

## 支持的文件格式

### Office格式
- `.doc`, `.docx` - Word文档
- `.xls`, `.xlsx` - Excel电子表格
- `.ppt`, `.pptx` - PowerPoint演示文稿

### 设计文件
- `.dwg` - AutoCAD绘图
- `.sldprt` - SolidWorks零件
- `.sldasm` - SolidWorks装配体

### 其他格式
- `.pdf` - PDF文档
- 图片文件 - JPG, PNG, GIF等
- 文本文件 - TXT, JSON, XML等

## 项目结构

```
eco-management-system/
├── server.js              # Express服务器
├── index.html             # HTML入口文件
├── package.json           # 项目依赖配置
├── vite.config.js         # Vite配置
├── src/
│   ├── main.js            # Vue应用入口
│   ├── App.vue            # 根组件
│   ├── router/
│   │   └── index.js       # 路由配置
│   ├── views/
│   │   ├── Home.vue       # 首页
│   │   ├── Documents.vue  # 文档管理页面
│   │   ├── Upload.vue     # 上传文件页面
│   │   └── Versions.vue   # 版本记录页面
│   └── components/
│       ├── FilePreview.vue       # 文件预览组件
│       └── VersionHistory.vue    # 版本历史组件
├── uploads/               # 文件上传目录
└── eco-data.json          # 本地数据库文件
```

## API端点

### 文档相关
- `GET /api/documents` - 获取所有文档
- `GET /api/documents/specialty/:specialty` - 按专业获取文档
- `POST /api/upload` - 上传新文件
- `PUT /api/documents/:id` - 更新文档（新版本）
- `DELETE /api/documents/:id` - 删除文档
- `GET /api/download/:id` - 下载文件

### 版本相关
- `GET /api/documents/:id/versions` - 获取文档的所有版本

## 使用说明

### 安装依赖
```bash
npm install
```

### 启动开发服务器

#### 启动后端服务（终端1）
```bash
node server.js
```

#### 启动前端开发服务（终端2）
```bash
npm run dev
```

前端将在 `http://localhost:5173` 启动
后端API在 `http://localhost:3001`

### 生产构建
```bash
npm run build
npm run preview
```

## 功能演示

### 上传文件
1. 导航到"上传文件"页面
2. 选择专业类别
3. 拖拽或点击选择文件
4. 点击"上传文件"按钮

### 预览文件
1. 在"文档管理"页面查看所有文件
2. 点击"预览"按钮
3. 系统自动选择合适的预览方式

### 查看版本
1. 点击"版本"按钮
2. 查看所有版本的变更记录
3. 可以下载特定版本的文件

## 文件存储

系统使用本地文件系统存储文件：
- 上传的文件存储在 `uploads/` 目录
- 元数据存储在 `eco-data.json` 文件中

### eco-data.json 结构
```json
{
  "documents": [
    {
      "id": "timestamp",
      "filename": "文件名",
      "filepath": "本地路径",
      "filetype": ".ext",
      "specialty": "Electronics|Mechanical|Software",
      "uploadDate": "ISO日期字符串",
      "versions": [
        {
          "versionId": 1,
          "description": "变更说明",
          "date": "ISO日期字符串",
          "filePath": "本地路径"
        }
      ]
    }
  ],
  "specialties": ["Electronics", "Mechanical", "Software"]
}
```

## 注意事项

1. **跨域配置**：后端已配置CORS，允许来自前端的请求
2. **文件大小**：根据服务器配置调整上传文件大小限制
3. **数据备份**：定期备份`eco-data.json`和`uploads/`目录
4. **安全建议**：在生产环境中添加身份认证和授权机制

## 未来扩展

- [ ] 用户认证系统
- [ ] 权限管理
- [ ] 文件搜索功能
- [ ] 更多预览格式支持
- [ ] 数据库集成（MySQL/MongoDB）
- [ ] 在线编辑功能
- [ ] 变更审批流程

## 许可证

MIT