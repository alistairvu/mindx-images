import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import ImageUploading from "react-images-uploading"
import { useState } from "react"

import CreateImageDelete from "../components/create/CreateImageDelete"
import storage from "../firebase"
import axiosClient from "../api"

interface UploadInterface {
  title: string
  description: string
}

const UploadPage: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadInterface>()
  const [images, setImages] = useState<any[]>()

  const handlePostUpload = async (uploadData: UploadInterface) => {
    try {
      if (images && images.length > 0) {
        const image = images[0]
        const imageUrl = await handleImageUpload(image.file)
        console.log(imageUrl)
        const post = { ...uploadData, imageUrl }
        const { data } = await axiosClient.post("/api/posts", { post })
        if (data.success) {
          window.alert("Upload success!")
          reset()
          setImages([])
        }
      } else {
        window.alert("Please add an image")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const uploadTask = storage.ref().child(`images/${file.name}`).put(file)

      const onProgress = () => {}
      const onError = (err: any) => reject(err)
      const onSuccess = () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => resolve(downloadURL))
      }

      uploadTask.on("state_changed", onProgress, onError, onSuccess)
    })
  }

  const handleImageChange = (imageList: any) => {
    setImages(imageList)
  }

  const queryClient = useQueryClient()

  useMutation(handlePostUpload, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", 1])
    },
  })

  return (
    <Container>
      <h1>Create a new post</h1>
      <Form onSubmit={handleSubmit(handlePostUpload)}>
        <Row>
          <Col xs={12} md={4}>
            <ImageUploading
              maxNumber={1}
              value={images}
              onChange={handleImageChange}
            >
              {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                <div className="upload-wrapper">
                  <Button
                    onClick={onImageUpload}
                    className={`mb-3 ${imageList.length > 0 && "d-none"}`}
                  >
                    Upload image
                  </Button>
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="image-item"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="image-wrapper"
                        onClick={() => onImageUpdate(index)}
                      >
                        <img
                          src={image.dataURL}
                          alt=""
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                      <CreateImageDelete onClick={() => onImageRemove(index)}>
                        <i className="fas fa-times"></i>
                      </CreateImageDelete>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </Col>
          <Col xs={12} md={8}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title..."
                {...register("title", { required: true })}
              />
              {errors.title && (
                <Form.Text className="text-danger">
                  {errors.title.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Write your description..."
                {...register("description", { required: true })}
              />
              {errors.description && (
                <Form.Text className="text-danger">
                  {errors.description.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button type="submit" variant="primary">
              Upload
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default UploadPage
