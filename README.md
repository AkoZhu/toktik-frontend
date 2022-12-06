# TokTik

## Front End

### 0. Install Deps
```
npm install
```

Default User:
```
username: demo
password: 123456
```

### 1. Setup Mock API

**If you have set up the backend, please skip this step!**

```
npm install -g json-server
cd test && json-server db.js --port 4000
```

### 2. Setup SaveFile Endpoint
```
cd test && node saveFile.js
```

### 3. Start the Frond End
```
npm start
```

### 4. Test

**Please keep the mock API running if you did not set up the backend!**

```
npm test
```
