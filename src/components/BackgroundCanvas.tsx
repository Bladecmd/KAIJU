import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    function syncSize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    window.addEventListener('resize', syncSize);
    syncSize();

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      float grid(vec2 uv, float res) {
        vec2 g = fract(uv * res);
        return 1.0 - smoothstep(0.0, 0.02, min(g.x, g.y));
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 center = u_mouse / u_resolution;
        
        // Deep obsidian background
        vec3 color = vec3(0.015, 0.015, 0.022);
        
        // Technical Grid
        float g = grid(uv, 24.0);
        color += g * 0.045;
        
        // Subtle secondary minor grid
        float gMinor = grid(uv, 96.0);
        color += gMinor * 0.015;
        
        // Dynamic pulse effect
        float pulse = sin(u_time * 0.45) * 0.5 + 0.5;
        
        // Logic Flow Lines (cybernetic scan)
        float lines = sin(uv.y * 120.0 + u_time * 1.8) * 0.5 + 0.5;
        lines *= smoothstep(0.46, 0.52, sin(uv.x * 12.0 + u_time * 0.9));
        color += lines * vec3(0.0, 0.35, 0.85) * 0.04 * pulse;
        
        // Interactive Mouse Glow (Electric Blue aura)
        float dist = distance(uv, center);
        float glow = smoothstep(0.28, 0.0, dist);
        color += glow * vec3(0.0, 0.55, 0.95) * 0.085;

        // Vignette at edges
        float vignette = 1.0 - smoothstep(0.5, 1.4, length(uv - 0.5) * 1.5);
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl as WebGLRenderingContext, gl.VERTEX_SHADER, vs);
    const fragmentShader = createShader(gl as WebGLRenderingContext, gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = window.innerHeight - event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const render = (time: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" id="kaiju-background-shader">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 transition-opacity duration-1000"
        style={{ display: 'block' }}
      />
      {/* Subtle scanline overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] opacity-25 pointer-events-none"
      />
    </div>
  );
};
