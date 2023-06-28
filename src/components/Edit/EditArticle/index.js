import Modal from "components/UI/Modal";
import Input from "components/UI/Input";
import Loading from "components/UI/Loading";
import Button from "components/UI/Button";
import addData from "firebase/addData";
import putData from "firebase/putData";


import { useEffect, useState } from "react";




const Index = ({ setIsOpen, Article, updateArticles }) => {
    const [ArticleForm, setArticleForm] = useState();
    const [edit, setEdit] = useState(false);


    const handleChange = (e) => {
        setArticleForm({ ...ArticleForm, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (Article != undefined) {
            setArticleForm(Article)
            setEdit(true)
        }
    }, [])



    const submitForm = (e) => {
        e.preventDefault();
        if (edit) {
            console.log("edit article : ", Article)
            putData("article", Article.id, ArticleForm).then((result, error) => {
                if (!error) {
                    updateArticles();
                    setIsOpen(false);
                }
            })
        } else {
            console.log("add article : ", ArticleForm)
            addData("article", ArticleForm).then(({ result, error }) => {
                if (!error) {
                    updateArticles();
                    setIsOpen(false);
                }
            })
        }
    }


    return (
        <Modal title="Article" closeModal={() => setIsOpen(false)}>
            <form onSubmit={(e) => { submitForm(e) }}>
                <Input
                    label="title"
                    type="text"
                    name="title"
                    value={ArticleForm?.title}
                    isRequired={true}
                    placeholder="Article title"
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    label="description"
                    type="text"
                    name="description"
                    value={ArticleForm?.description}
                    isRequired={true}
                    placeholder="Article description"
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    label="content"
                    type="text"
                    name="content"
                    value={ArticleForm?.content}
                    isRequired={true}
                    placeholder="Article content"
                    onChange={(e) => handleChange(e)}
                />
                {edit && <Button type="submit" title="modifier" className="btn__primary" /> || <Button type="submit" title="ajouter" className="btn__primary" />}

            </form>
        </Modal>
    );
}

export default Index;
