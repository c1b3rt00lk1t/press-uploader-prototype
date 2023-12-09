<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-uploader-prototype/blob/demo/images/uploader.png?raw=true" width="20%" height="20%" >
</p>

# Document Tag Manager & Uploader

### Basic description

PWA · JAVASCRIPT · REACT · FIREBASE · CYPRESS  
Backend PWA to classify pdf documents with tags and upload them in order to be accessed form across an organization.

### Available demo online

A working version of the desktop app can be found <a href="https://press-uploader-demo.web.app/" target="_blank">here</a>.

### Basic usage

- To run the app in local: <code>$ npm run start</code>
- To run the e2e cypress tests in local: <code>$ npm run cypress:open</code>

### Cloc stats

![cloc stats](https://github.com/c1b3rt00lk1t/press-uploader-prototype/blob/demo/images/cloc_stats.png?raw=true)

### Technical description

The app leverages on the following technical pilars:

- The app is written in <code>Javascript</code> and <code>JSX</code> using the <code>React</code> library, initially bootstraped with create-react-app.
- The state is managed combining <code>useState</code> with <code>createContext()</code> provided with a functional component that takes <code>children</code> as props and returns the <code>context.Provider</code>.
- The resulting context is consumed via <code>useContext</code>.
- Side effects are handled with <code>useEffect</code>.
- <code>useRef</code> is used to target specific DOM elements across renderings.
- Firebase is used for Hosting, Database and Storage.
- The app programatically reads and writes in the Database and the Storage bucket.
- Cors is handled with a specific file <code>cors.json</code> and <code>gsutil</code> configuration.
- The app handles two simultaneous Firebase instances as the Reader needs a primary and a secondary source.
- Currying is used to build specialized functions.
- Pagination is achieved using <code>react-router-dom</code>.

### Functional description

The app allows a given set of pdfs in a group of folders to be managed in the following ways:

- Order the files with drag and drop in order to ensure that they are displayed in a specific sequence
- Check that the files order and the files in the folders match
- Check the size and rare characters of the files
- Tag the pdf files with a set of tags from a Dictionary including zones, sectors and general themes
- Create new tags in the Dictionary tree
- Easily copy or propagate a set of tags or the last tag through the pdfs
- Upload the files in a primary and a secondary storage
- Checkout the session so that it can be accessed and downloaded
- Two flows available: from Folder to Server or form Server to Server

<br/><br/>
<br/><br/>
![app flow](https://github.com/c1b3rt00lk1t/press-uploader-prototype/blob/demo/images/uploader_flow.gif?raw=true)
