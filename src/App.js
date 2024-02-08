 import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button, TabContainer } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import { supabase } from './supabaseClient';

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);

  console.log(name);
  console.log(description);

  useEffect(() => {
    getProducts();
  }, [])

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10)
      if (error) throw error;
      if (data != null) {
        setProducts(data); // [product1,product2,product3]
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name,
          description: description
        })
        .single()

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  function printProductData() {
    // Abre una ventana de impresión y muestra la información de los productos
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Informe de Productos</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">');
    printWindow.document.write('</head><body>');

    printWindow.document.write('<div class="container">');
    printWindow.document.write('<h2 class="mt-3">Informe de Productos</h2>');

    printWindow.document.write('<table class="table mt-3">');
    printWindow.document.write('<thead class="thead-dark"><tr><th>Nombre del Producto</th><th>Descripción</th></tr></thead><tbody>');

    products.forEach((product) => {
      printWindow.document.write(`<tr><td>${product.name}</td><td>${product.description}</td></tr>`);
    });

    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</div>');
 
    // Pie de página con la fecha
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES');
    printWindow.document.write(`<footer class="fixed-bottom bg-light p-2 text-center">Fecha del Informe: ${formattedDate}</footer>`);

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }

  console.log(products);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Programacion Integrativa</Navbar.Brand>
          <Nav>
            <Nav.Item style={{ color: 'white' }}>Productos</Nav.Item>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              className="mr-2"
              onChange={(e) => searchProducts(e.target.value)}
            />
            <Button variant="outline-light">Buscar</Button>
          </Form>
        </Container>
      </Navbar>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} md={6}>
            <h3>Crear nuevo producto</h3>
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Label>Descripcion del Producto</Form.Label>
            <Form.Control
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br></br>
            <Button type="button" onClick={() => createProduct()}>Crear</Button>
          </Col>
        </Row>
      </Container>
      <hr></hr>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Productos disponibles en bodega</Navbar.Brand>
           
          <Button variant="info" onClick={() => printProductData()}>Imprimir Datos</Button>
        </Container>
      </Navbar>
      <h4 className='text-center'></h4>
      
      <Container>
        <table className="table text-center">
          <thead className="table-dark">
            <tr>
              <th>Nombre del Producto</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          </table>


          <table className="table">

           
          {products.map((product) => (
            <tbody key={product.id}>
              <ProductCard product={product} /> {/* product={product} */}
            </tbody>
          ))}
           
         </table>
        
      </Container>

    </>
  );
}

export default App;
