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

### 5. Data Structures

Component-үүдийн оролт, гаралтын хувьд тогтвортой өгөгдлийн бүтцийг ашиглах. Өгөгдлийн бүтцийг сайн тодорхойлсон бөгөөд ойлгомжтой болгох.

```jsx
// Bad example:
function Product({ product }) {
  return (
    <div>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

// Good example:
function Product({ title, price, description }) {
  return (
    <div>
      <p>{title}</p>
      <p>{price}</p>
      <p>{description}</p>
    </div>
  );
}
```

### 6. Error Handling

Алдааны тодорхой мэдээллүүдийг өгч, гэнэтийн алдаа, эвдрэлээс урьдчилан сэргийлэх алдаатай харьцах механизмуудыг оруул.

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

Component-үүд нь хүлээгдэж буйгаар ажиллаж байгаа эсэхийг шалгахын тулд нэгжийн туршилтуудыг оруулаарай. Туршилтын тууштай аргачлалыг дагаж, шалгалтыг сайтар баримтжуулсан эсэхийг шалгаарай.

### 8. Security

Component-үүд нь аюулгүй байдлын үүднээс хийгдсэн эсэхийг шалгаарай. Аюулгүй кодчилол хийх шилдэг туршлагыг ашиглаж, аюулгүй байдлын нийтлэг эмзэг байдлаас зайлсхий.

### 9. Performance

Шаардлагатай бол гүйцэтгэлийн хувьд Component-үүдийг оновчтой болгох. Гүйцэтгэлийн саад тотгорыг тодорхойлж, оновчтой болгохын тулд профайлын хэрэгслийг ашиглана уу.

### 10. Code Review

Component-үүд нь кодчиллын стандарт, шилдэг туршлагыг дагаж мөрдөж байгаа эсэхийг баталгаажуулахын тулд кодын хянан шалгах. Шүүгчид кодын чанар, үйл ажиллагаа, засвар үйлчилгээний талаар санал хүсэлтээ өгөх ёстой.

```

```
