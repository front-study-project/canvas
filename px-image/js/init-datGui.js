const UPLOAD_IMAGE_KEY = 'Upload Image'
const EXPORT_IMAGE_KEY = 'Export Image'

const fileInput = document.querySelector('#fileUpload')
const gui = new dat.GUI()

fileInput.addEventListener('change', (e) => {
  let file = e.target.files[0]
  console.log('Upload File is :')
  console.log(file)
  const fileReader = new FileReader()

  fileReader.onload = function(e) {
    console.log('Image to base64 Data is :')
    console.log(e.target.result)
    drawOriginalImage(e.target.result)
  }
  fileReader.readAsDataURL(file)

})

const controls = {
  [UPLOAD_IMAGE_KEY]: function() {
    fileInput.click()
  },
  Iters: 5,
  BlockSize: 5,
  Stride: 5,
  Weight: 5,
  Grid: true,
  [EXPORT_IMAGE_KEY]: function() {
    console.log('export image')
  }
}

gui.add(controls, UPLOAD_IMAGE_KEY)
gui.add(controls, 'Iters', 0, 20)
gui.add(controls, 'BlockSize', 0, 20)
gui.add(controls, 'Stride', 0, 20)
gui.add(controls, 'Weight', 0, 20)
gui.add(controls, 'Grid')
gui.add(controls, EXPORT_IMAGE_KEY)