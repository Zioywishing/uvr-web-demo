# 音频分离 Demo (Pure Frontend Audio Separation)

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

A pure frontend implementation of audio separation using ONNX Runtime Web to run UVR (Ultimate Vocal Remover) models directly in the browser.

### 🌟 Features
- **Pure Frontend**: No backend server required; all processing happens locally in your browser.
- **ONNX Runtime Web**: Leverages WebAssembly (WASM) and WebGL/WebGPU for high-performance inference.
- **MDX-NET Support**: Compatible with MDX-NET models for high-quality vocal and instrumental separation.
- **Web Worker**: Background processing to keep the UI responsive during heavy computation.
- **KissFFT**: Integrated for efficient Fast Fourier Transform operations.

### 🚀 Quick Start
1. **Install Dependencies**:
   ```bash
   bun install
   ```
2. **Run Development Server**:
   ```bash
   bun run dev
   ```
3. **Build for Production**:
   ```bash
   bun run build
   ```

---

<a name="中文"></a>
## 中文

这是一个纯前端实现的音频分离演示项目，利用 ONNX Runtime Web 在浏览器中直接运行 UVR (Ultimate Vocal Remover) 模型。

### 🌟 项目特性
- **纯前端实现**：无需后端服务器，所有计算和推理都在浏览器本地完成，保护隐私且节省服务器资源。
- **ONNX Runtime Web**：利用 WebAssembly (WASM) 以及 WebGL/WebGPU 加速推理，提供接近原生的处理速度。
- **支持 MDX-NET**：支持高质量的 MDX-NET 模型，可进行精准的人声与背景音乐（伴奏）分离。
- **多线程处理**：使用 Web Worker 在后台进行音频处理，确保主线程 UI 丝滑不卡顿。
- **KissFFT 库**：内置高效的快速傅里叶变换 (FFT) 处理音频频域数据。

### 🚀 快速开始
1. **安装依赖**:
   ```bash
   bun install
   ```
2. **启动开发服务器**:
   ```bash
   bun run dev
   ```
3. **生产环境打包**:
   ```bash
   bun run build
   ```
