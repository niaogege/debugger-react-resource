import ClassIndex from "../../component/asyncAnd/classIndex";
import ParentIndex from "../../component/asyncAnd/parent";

export default function About() {
  return (
    <div>
      <ParentIndex>
        <ClassIndex />
      </ParentIndex>
    </div>
  );
}
