import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Card, Badge } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./MyNotes.css";
// import notes from "../../data/notes";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import CardHeader from "react-bootstrap/esm/CardHeader";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}...`} className="mn">
      <Link to="/createnote">
        <Button size="lg" className="cnn">
          + Create New Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes &&
        notes
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion key={note._id}>
              <AccordionItem eventKey="0">
                <Card className="card">
                  <AccordionHeader variant="link" event="0" className="acche">
                    <CardHeader className="ch">
                      <span className="titl">{note.title}</span>
                      <div className="edb">
                        <Button className="eb" href={`/note/${note._id}`}>
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          className="db"
                          onClick={() => deleteHandler(note._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardHeader>
                  </AccordionHeader>

                  <AccordionBody>
                    <Card.Body className="cardBody">
                      <h4>
                        <Badge variant="success">
                          Category - {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                        <footer className="blockquote-footer">
                          Created on{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </AccordionBody>
                </Card>
              </AccordionItem>
            </Accordion>
          ))}
    </MainScreen>
  );
};

export default MyNotes;
