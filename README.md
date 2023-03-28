## ReactJS and NextJS coding standards

Эдгээр кодчиллын стандартууд нь кодын чанарыг сайжруулж, илүү тогтвортой болгож, алдаа гарах магадлал болон аюулгүй байдлын эмзэг байдлыг багасгахад тусална.

### 1. Naming Conventions

Хувьсагч, функц, бүрэлдэхүүн хэсгүүдийн нэрсийг тодорхой, товчоор нэрлээрэй. Component-үүдийн нэрлэхдээ CamelCase тэмдэглэгээг ашиглана.

```jsx
// Bad example:
function hldr(props) {
  return (
    <div className="hldr">
      <p className="txt">{props.text}</p>
    </div>
  );
}

// Good example:
function Holder(props) {
  return (
    <div className="holder">
      <p className="text">{props.text}</p>
    </div>
  );
}
```

### 2. File Organization

Файлуудыг logical group болон directories болгон зохион байгуулаарай. Файлын зорилгыг тусгасан нэршлийг ашиглаарай.

```markdown
- components/
  - Layout/
    - index.js
    - Header.js
    - Footer.js
  - Blog/
    - index.js
    - Post.js
  - Product/
    - index.js
    - List.js
    - Details.js
```

### 3. Code structure

Унших, ойлгоход хялбар кодын бүтцийг ашигла. Уншиж ойлгоход хялбар байхын тулд догол болон зайг ашиглана уу.

```jsx
import React from "react";

function ExampleComponent(props) {
  const { data } = props;

  function handleClick() {
    console.log("Button clicked!");
  }

  return (
    <div className="example-component">
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default ExampleComponent;
```

#### Энэ жишээнд:

##### 1. Бүрэлдэхүүн хэсгүүдийн хооронд зай авсан байна.

##### 2. Хувьсагч зарлахдаа зорилгыг тусгасан утга учиртай нэр ашигласан (data, handleClick).

##### 3. Class болон function нэрлэхдээ зорилгыг тусгасан утга учиртай нэр ашигласан (ExampleComponent, handleClick).

##### 4. (=, {}, ()) оператор болон хаалт хооронд тогтмол зайг ашигласан.

##### 5. JSX syntax ашиглан унших, ойлгоход хялбар болгон элемент бүрийг догол мөрөнд бичсэн.

##### 6. Consistent convention-ий дагуу Component-ийг file-ийн доод хэсэгт export хийсэн.

### 4. Componentization

Component-үүд нь модульчлагдсан, дахин ашиглах боломжтой байхаар хийгдсэн эсэхийг шалгаарай. Component-үүдийн код эсвэл функцийг давхардахаас зайлсхий.

```jsx
import React from "react";
import PropTypes from "prop-types";

function Button(props) {
  const { onClick, children } = props;

  return <button onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
```

#### Энэ жишээнд:

##### 1. Application-ий хаана ч ашиглаж болох дахин ашиглах боломжтой Button component үүсгэсэн.

##### 2. Өөрчлөх, дахин ашиглах боломжийг олгохын тулд props ашигласан (onClick and children).

##### 3. Төрөл шалгах, алдаа гарахаас урьдчилан сэргийлэхийн тулд PropTypes-ийг тодорхойлсон.

##### 4. Бусад component-нд ашиглахын тулд файлын төгсгөлд component-ийг экспортолсон.

##### 5. Code давхардахаас сэргийлэн Button element-д зориулан тусад нь component үүсгэсэн.

##### 6. Modular code structure-ийн дагуу Button component-д тусад нь file үүсгэсэн ба энэ нь дахин ашиглах болон өөрчлөхөд хялбар болгодог.

### 5. State management

State management нь application болон system-ийн төлөвийг удирдах, шинэчлэх үйл явцыг хэлнэ.State management нь component болон модулиудыг өөр хоорондоо харилцах, програмын төлөв байдлыг тогтмол харах боломжийг олгодог тул нарийн төвөгтэй програмуудыг бий болгох чухал үүрэгтэй. State management-ийн хэдэн арга байдаг. Үүнд:

- Global variable зарлан component хооронд props-оор дамжуулах
- State management-ийн сан ашиглах(Redux, MobX, or React Context API)

State management-ийн сан ашиглах нь төлөвийг өөр өөр component-аас шинэчлэх болон data source-ийг ашиглах зэрэг үйл явцыг хялбарчлахад тусална. Энэ нь төлөвийг удирдахад шаардагдах кодын хэмжээг багасгах, гүйцэтгэлийг сайжруулах, цаг хугацааны явцад програмыг debug хийх, засварлахад хялбар болгоход тусална.

### 6. Error Handling

Error Handling хийх нь алдааны message-ийг цэвэрлэх, зохион байгуулахаас гадна unexpected errors болон crashes-аас сэргийлнэ.

```jsx
function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit(username, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
```

### 7. Testing

Component-үүдыг төлөвлөсөний дагуу ажиллаж байгаа эсэхийг шалгаарай. Test хийх арга барилуудаас ашиглан шалгаж болдог.

```jsx
// Button.js

import React from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
```

```jsx
// Button.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Button text="Click me!" />);
    expect(getByText("Click me!")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick} text="Click me!" />
    );
    fireEvent.click(getByText("Click me!"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 8. Security

Component-үүд нь аюулгүй байдлын үүднээс хийгдсэн эсэхийг шалгаарай. Аюулгүй кодчилол хийх шилдэг туршлагыг ашиглаж, аюулгүй байдлын нийтлэг эмзэг байдлаас зайлсхий.

### 9. Performance

Шаардлагатай бол гүйцэтгэлийн хувьд Component-үүдийг оновчтой болгох. Гүйцэтгэлийн саад тотгорыг тодорхойлж, оновчтой болгохын тулд профайлын хэрэгслийг ашиглана уу.

### 10. Code Review

Component-үүд нь кодчиллын стандарт, шилдэг туршлагыг дагаж мөрдөж байгаа эсэхийг баталгаажуулахын тулд кодын хянан шалгах. Шүүгчид кодын чанар, үйл ажиллагаа, засвар үйлчилгээний талаар санал хүсэлтээ өгөх ёстой.

```

```
