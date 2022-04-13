import { EditorState, basicSetup } from "@codemirror/basic-setup"
import { defaultTabBinding } from "@codemirror/commands"
import { EditorView, keymap } from "@codemirror/view" //creates editor view 
import { json } from "@codemirror/lang-json"// the language we want to use

export default function setupEditors() {
  const jsonRequestBody = document.querySelector("[data-json-request-body]")//from html file name of div
  const jsonResponseBody = document.querySelector("[data-json-response-body]")//from html file name of div

  const basicExtensions = [// variable extension that both our editors share
    basicSetup,// adding this does 95% of the setup stuff
    keymap.of([defaultTabBinding]),//tgis allows us to use tabs inside the text editors
    json(),// to tell it what language we wil be using
    EditorState.tabSize.of(2),// tab sizes
  ]

  const requestEditor = new EditorView({
    state: EditorState.create({// so now we creat a brand new editorstate 
      doc: "{\n\t\n}",// text content
      extensions: basicExtensions,
    }),
    parent: jsonRequestBody,// what is the new editorview created attached to 
  })

  state: EditorState.create({
        const responseEditor = new EditorView({//like requestEditor
      doc: "{}",
      extensions: [...basicExtensions, EditorView.editable.of(false)],// editable false ensure its read only as its the response you are supposed to read not edit
    }),
    parent: jsonResponseBody,
  })

  function updateResponseEditor(value) {// we need this to update the value shown in response
    responseEditor.dispatch({// this emits the changes added below
      changes: {
        from: 0,// this means taking everything from our doc starting at index 0
        to: responseEditor.state.doc.length,// this shows till the end of the doc
        insert: JSON.stringify(value, null, 2),//this says replace everything from our doc with a nice and tidy json text shown here
      },
    })
  }

  return { requestEditor, updateResponseEditor }
}