import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';

// import './styles.css';

interface EditorProps {
  value: string;
  placeholder: string;
  onChange: (html: string) => void;
  refresh?: boolean;
}

const Editor = ({ value, placeholder, onChange, refresh }: EditorProps) => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
    placeholder,
  });

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        onChange(html);
        //maintain cursor position
        // quill.focus();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill]);

  useEffect(() => {
    if (value && quill) {
      //   quill.clipboard.dangerouslyPasteHTML(value);
      (quill.container.firstChild as HTMLElement).innerHTML = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, refresh]);

  return (
    <div
    // style={{ width: 500, height: 300 }}
    >
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
