import { ImeProperties } from "../modules/ime.ts";

export default function TextEditor(properties: ImeProperties) {
  return (
    <div class="container">
        <form>
            <div class="row">
            <button id="download" class="btn round"><i class="fa fa-download"></i></button>
            <button id="coppy" class="btn round"><i class="fa fa-copy"></i></button>
            <button id="resset" class="btn round"><i class="fa fa-times"></i></button>
            </div>
            <br />
            <div class="row">
            <textarea id="tekst" name="Tekst" placeholder="Arabic text..." style="height:800px"></textarea>
            </div>
        </form>
    </div>
  );
}
