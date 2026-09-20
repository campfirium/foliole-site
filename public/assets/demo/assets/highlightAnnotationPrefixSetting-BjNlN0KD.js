import{i as e,n as t,s as n}from"./storage-Boa1JFv6.js";var r=`※ `;function i(e,t){return[`\r
`,`
`,`\r`].map(n=>({lineEnding:n,index:e.indexOf(`${n}${t}`)})).filter(e=>e.index>=0).sort((e,t)=>e.index-t.index)[0]??null}function a(e){let t=e.notePrefix??`※ `,n=i(e.content,t);return n?{body:e.content.slice(0,n.index),lineEnding:n.lineEnding,note:e.content.slice(n.index+n.lineEnding.length+t.length).trim()||null}:{body:e.content,lineEnding:null,note:null}}function o(e){let t=e.note.replace(/\r\n?/g,`
`).trim();if(!t)return e.content;let n=e.notePrefix??`※ `,r=a({content:e.content,notePrefix:n}),i=r.lineEnding??(e.content.includes(`\r
`)?`\r
`:`
`);return`${r.body}${i}${n}${t}`}function s(e){let t=e.text.replace(/\r\n?/g,`
`).trim(),n=e.note?.replace(/\r\n?/g,`
`).trim()??``;return n?`${t}\n${e.notePrefix??`※ `}${n}`:t}var c=24;function l(e){let t=(e??``).replace(/\r\n?/g,`
`).split(`
`)[0]?.slice(0,c)??``;return t.length>0?t:r}function u(){return l(t(n.highlightAnnotationPrefix))}function d(t){let r=l(t);return e(n.highlightAnnotationPrefix,r),r}export{a,s as i,d as n,o,r,u as t};