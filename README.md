# ReactJS NextJS кодын стандарт болон зарчимууд

## Баримтлавал зохих зарчимууд

## SOLID

![SOLID Principles](https://miro.medium.com/max/1191/1*OzwARbvHUg1RlZ7LYyLCrg.png)

### 1. SRP: Single Responsibility Principle

Тодорхойлолт: Component бүр өөрийн ганц үүрэгтэй байхаар зохион бүтээх. Энэ нь code-ийг илүү readable, maintainable and scalable болгодог.
Хэрэв бүрэлдэхүүн хэсэг нь олон үүрэгтэй бол түүнийг засварлах, шалгахад хэцүү болно.

**SRP ашиглаагүй жишээ**

```js
function UserProfile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/users/123")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
```

**SRP ашигласан жишээ**

```js
function UserProfile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/users/123")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <UserProfileDisplay user={user} />
      )}
    </div>
  );
}

function UserProfileDisplay(props) {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {props.user.name}</p>
      <p>Email: {props.user.email}</p>
    </div>
  );
}
```

### 2. OCP: Open-Closed Principle

Тодорхойлолт: OCP нь class эсвэл модулийг өргөтгөхөд нээлттэй боловч өөрчлөхөд хаалттай байх ёстой. Component хэсэг нь шинэ props эсвэл state-ийг хүлээн авахад нээлттэй байх ёстой, гэхдээ түүний дотоод хэрэгжилтийг өөрчлөх ёсгүй.

**OCP ашиглаагүй жишээ**

```js
function Button(props) {
  const { label, onClick, color } = props;

  return (
    <button onClick={onClick} style={{ backgroundColor: color }}>
      {label}
    </button>
  );
}
```

**OCP ашигласан жишээ**

```js
function BaseButton(props) {
  const { label, onClick, style } = props;

  return (
    <button onClick={onClick} style={style}>
      {label}
    </button>
  );
}
```

### 3. LCP: Liskov Substitution Principle

Тодорхойлолт: Тухайн component нь supertype буюу native element-ийн attributes-ийг дэмждэг байхаар хийх. Child component нь програмын үйл ажиллагаанд нөлөөлөхгүйгээр parent component-г орлуулах боломжтой байх ёстой.

**LCP ашиглаагүй жишээ**

```js
export function SearchInput(props) {
  const { value, onChange } = props;

  return (
    <input
      type="search"
      id="default-search"
      placeholder="Search for the right one..."
      required
      value={value}
      onChange={onChange}
    />
  );
}
```

**LCP ашигласан жишээ**

```js
export function SearchInput(props: ISearchInputProps) {
  const { value, isLarge, ...restProps } = props;

  return (
    <input
      type="search"
      id="default-search"
      placeholder="Search for the right one..."
      className={`${isLarge ? "w-full" : "w-auto"}`}
      required
      value={value}
      {...restProps}
    />
  );
}
```

### 4. ICP: Interface Segregation Principle

Тодорхойлолт: Тухайн component шаардлагагүй **Interface**-ээс хамаарах ёсгүй.

**ICP ашиглаагүй жишээ**

```js
function Product({ product }) {
  return (
    <li>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
    </li>
  );
}

function App() {
  const products = [
    { id: 1, name: "Product 1", description: "Description 1", price: 10 },
    { id: 2, name: "Product 2", description: "Description 2", price: 20 },
  ];

  return (
    <ul>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
}
```

**ICP ашигласан жишээ**

```js
function Product({ name, description }) {
  return (
    <li>
      <h2>{name}</h2>
      <p>{description}</p>
    </li>
  );
}

function App() {
  const products = [
    { id: 1, name: "Product 1", description: "Description 1", price: 10 },
    { id: 2, name: "Product 2", description: "Description 2", price: 20 },
  ];

  return (
    <ul>
      {products.map((product) => (
        <Product
          key={product.id}
          name={product.name}
          description={product.description}
        />
      ))}
    </ul>
  );
}
```

### 5. DIP - Dependency Inversion Principle

Тодорхойлолт: Хараат байдлын урвуу зарчим. DIP нь өндөр түвшний модулиуд нь доод түвшний модулиудаас хамаарах ёсгүй гэж заасан. Аль аль нь хийсвэрлэлээс хамаарах ёстой. ReactJS-д энэ зарчмыг бүрэлдэхүүн хэсгийн хамааралд хэрэглэж болно. Бүрэлдэхүүн хэсэг нь тодорхой хэрэгжилтийн оронд хийсвэрлэлээс хамаарах ёстой.

**DIP ашиглаагүй жишээ**

```js
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then(setProducts);
  }, []);

  return (
    <ul>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
}
```

**DIP ашигласан жишээ**

```js
function ProductList({ productService }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getProducts().then(setProducts);
  }, [productService]);

  return (
    <ul>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
}
```

## Зарчимууд

![More Principles](https://miro.medium.com/max/3800/1*RQJCJDy_JxfRXPvSpkN3Jg.png)

### 1. YAGNI: You Aren't Gonna Need It

Хэрэгцээгүй шинэ функц, нэмэлтээр оруулах хэрэггүй. Ирээдүйд хэрэг болж юуны магад гээд нэмэлтээр юм оруулчих тал байдаг. Гэвч ашиглагдахгүй удсан тохиолдолд, хэсэг хугацааны дараа энийг юунд ашигладаг юм бол? яах гэж оруулсан юм бол? гэх асуултуудыг бий болж ирэх нь бий.

### 2. KISS: Keep It Simple Stupid

Аль болох энгийнээр бичигдсэн байх. Илүүдэл ойлгоход хэцүү ярвигтай зүйл бичихээс зайлсхийх, жижиг хэсгүүдэд хувааж энгийн болгох. Гэхдээ хэт амарчилж болохгүй.

### 3. DRY: Don't Repeat Yourself

Нэг бичсэн кодоо дахин давтахгүй байх. Анхлан бичигчдэд их тохиолддог. Олон газар давхардсан кодууд ашиглах нь дараа засаж сайжруулах үед бүгдийг өөрчлөх шаардлага гарч мэднэ. Энэ үед маш их цаг хүч шаардагддаг.

## A component coding standard

Эдгээр стандартууд нь component-үүдийг тогтвортой, засвар үйлчилгээ хийх, дахин ашиглах боломжтой болгоход тусалдаг.

### 1. Naming Conventions

Тодорхой, дүрсэлсэн нэрсийг ашигла. Нийтлэг ойлгогддоггүй товчлол, товчилсон үг ашиглахаас зайлсхий. Конвенцуудыг нэрлэхдээ CamelCase тэмдэглэгээг ашиглана уу.

### 2. File Organization

Файлуудыг логик бүлгүүд болон directories болгон зохион байгуул.

```markdown
- pages/
  - index.js
  - about.js
  - blog/
    - index.js
    - [slug].js
  - products/
    - index.js
    - [productId].js
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
- styles/
  - global.css
  - Layout.module.css
  - Blog.module.css
  - Product.module.css
- utils/
  - api.js
- public/
  - images/
  - favicon.ico
- package.json
  - ...

### 3. Documentation

Бүрэлдэхүүн хэсгийн зорилго, хэрхэн ажилладаг, хэрхэн ашиглах талаар тайлбарласан тайлбаруудыг кодоо оруулна уу. Бүрэлдэхүүн хэсэгт хамаарах аливаа таамаглал, хязгаарлалтыг баримтжуулах.

### 4. Functionality

Бүрэлдэхүүн хэсгүүд нь модульчлагдсан, дахин ашиглах боломжтой байхаар хийгдсэн эсэхийг шалгаарай. Бүрэлдэхүүн хэсгүүдийн код эсвэл функцийг давхардахаас зайлсхий.

### 5. Data Structures

Бүрэлдэхүүн хэсгүүдийн оролт, гаралтын хувьд тогтвортой өгөгдлийн бүтцийг ашиглах. Өгөгдлийн бүтцийг сайн тодорхойлсон бөгөөд ойлгомжтой болгох.

### 6. Error Handling

Алдааны тодорхой мэдээллүүдийг өгч, гэнэтийн алдаа, эвдрэлээс урьдчилан сэргийлэх алдаатай харьцах механизмуудыг оруул.

### 7. Testing

Бүх бүрэлдэхүүн хэсгүүд нь хүлээгдэж буйгаар ажиллаж байгаа эсэхийг шалгахын тулд нэгжийн туршилтуудыг оруулаарай. Туршилтын тууштай аргачлалыг дагаж, шалгалтыг сайтар баримтжуулсан эсэхийг шалгаарай.

### 8. Security

Бүрэлдэхүүн хэсгүүд нь аюулгүй байдлын үүднээс хийгдсэн эсэхийг шалгаарай. Аюулгүй кодчилол хийх шилдэг туршлагыг ашиглаж, аюулгүй байдлын нийтлэг эмзэг байдлаас зайлсхий.

### 9. Performance

Шаардлагатай бол гүйцэтгэлийн хувьд бүрэлдэхүүн хэсгүүдийг оновчтой болгох. Гүйцэтгэлийн саад тотгорыг тодорхойлж, оновчтой болгохын тулд профайлын хэрэгслийг ашиглана уу.

### 10. Code Review

Бүрэлдэхүүн хэсгүүд нь кодчиллын стандарт, шилдэг туршлагыг дагаж мөрдөж байгаа эсэхийг баталгаажуулахын тулд кодын хянан шалгах. Шүүгчид кодын чанар, үйл ажиллагаа, засвар үйлчилгээний талаар санал хүсэлтээ өгөх ёстой.
```
