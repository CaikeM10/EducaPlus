import{u as f,c as y,r as b,a as j,j as e,L as c,O as g}from"./index-Cy4cndB2.js";import{a as t,B as x}from"./button-BME9v__j.js";import{B as i}from"./book-open-BQddon3s.js";import{S as N}from"./sparkles-DcemTHRO.js";import{C as v}from"./calendar-DlMRe5Bd.js";import{B as k}from"./book-marked-BBnelQ7C.js";import{U as w}from"./user-B-ABiIWc.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],_=t("layout-dashboard",M);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]],z=t("library",L);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],C=t("log-out",B);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],$=t("menu",P);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],O=t("x",E);function R(){var d;const m=f(),o=y(),[r,l]=b.useState(!1),{logout:h,user:a}=j(),p=()=>{h(),m("/login")},u=[{path:"/app",label:"Painel",icon:_},{path:"/app/learning-paths",label:"Trilhas de Aprendizado",icon:i},{path:"/app/planner",label:"Planejador",icon:v},{path:"/app/library",label:"Biblioteca",icon:z},{path:"/app/diary",label:"Diário",icon:k}],n=s=>s==="/app"?o.pathname===s:o.pathname.startsWith(s);return a?e.jsxs("div",{className:"min-h-screen bg-muted/20 flex",children:[r&&e.jsx("div",{className:"fixed inset-0 bg-black/40 z-40 md:hidden",onClick:()=>l(!1)}),e.jsxs("aside",{className:`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-[280px]
          bg-white/95 backdrop-blur-xl
          border-r border-border/50
          shadow-xl md:shadow-none
          transition-transform duration-300
          flex flex-col
          ${r?"translate-x-0":"-translate-x-full md:translate-x-0"}
        `,children:[e.jsx("div",{className:"p-6 border-b border-border/50",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"bg-primary rounded-2xl p-3 shadow-md",children:e.jsx(i,{className:"w-6 h-6 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold text-xl tracking-tight",children:"EducaPlus"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Plataforma Educacional"})]})]})}),e.jsx("div",{className:"px-4 pt-6",children:e.jsxs("div",{className:"rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-4 border border-primary/10",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"bg-primary text-white rounded-xl w-12 h-12 flex items-center justify-center font-semibold text-lg shadow-sm",children:(d=a==null?void 0:a.name)==null?void 0:d.charAt(0)}),e.jsxs("div",{className:"flex-1 overflow-hidden",children:[e.jsx("p",{className:"font-semibold truncate",children:a==null?void 0:a.name}),e.jsx("p",{className:"text-xs text-muted-foreground truncate",children:a==null?void 0:a.email})]})]}),e.jsxs("div",{className:"mt-4 flex items-center gap-2 text-xs text-primary font-medium",children:[e.jsx(N,{className:"w-3.5 h-3.5"}),"Aprendizado ativo"]})]})}),e.jsx("nav",{className:"flex-1 px-4 py-6 space-y-2 overflow-y-auto",children:u.map(s=>e.jsxs(c,{to:s.path,onClick:()=>l(!1),className:`
                group flex items-center gap-3
                px-4 py-3 rounded-2xl
                transition-all duration-200
                font-medium
                ${n(s.path)?"bg-primary text-white shadow-md":"text-muted-foreground hover:bg-muted hover:text-foreground"}
              `,children:[e.jsx(s.icon,{className:"w-5 h-5"}),e.jsx("span",{className:"text-sm",children:s.label})]},s.path))}),e.jsxs("div",{className:"p-4 border-t border-border/50 space-y-2",children:[e.jsxs(c,{to:"/app/profile",onClick:()=>l(!1),className:`
              flex items-center gap-3
              px-4 py-3 rounded-2xl
              transition-all duration-200
              font-medium
              ${n("/app/profile")?"bg-primary text-white shadow-md":"text-muted-foreground hover:bg-muted hover:text-foreground"}
            `,children:[e.jsx(w,{className:"w-5 h-5"}),e.jsx("span",{className:"text-sm",children:"Perfil"})]}),e.jsxs(x,{variant:"ghost",onClick:p,className:"w-full justify-start gap-3 rounded-2xl h-12 text-destructive hover:text-destructive hover:bg-destructive/10",children:[e.jsx(C,{className:"w-5 h-5"}),e.jsx("span",{className:"text-sm",children:"Sair"})]})]})]}),e.jsxs("div",{className:"flex-1 flex flex-col min-h-screen",children:[e.jsxs("header",{className:"md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-border/50 px-4 py-3 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"bg-primary rounded-xl p-2",children:e.jsx(i,{className:"w-5 h-5 text-white"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold",children:"EducaPlus"}),e.jsx("p",{className:"text-xs text-muted-foreground",children:"Painel Educacional"})]})]}),e.jsx(x,{variant:"ghost",size:"icon",className:"rounded-xl",onClick:()=>l(!r),children:r?e.jsx(O,{className:"w-6 h-6"}):e.jsx($,{className:"w-6 h-6"})})]}),e.jsx("main",{className:"flex-1 p-4 md:p-8",children:e.jsx("div",{className:"max-w-7xl mx-auto",children:e.jsx(g,{})})})]})]}):null}export{R as default};
