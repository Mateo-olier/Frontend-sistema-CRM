import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ListComentarios from "./ListComentarios";
import { useDispatch } from "react-redux";
import { CommentAdd } from "../features/comments/commentSlice";
import { useParams } from "react-router-dom";
export default function Comentario() {
  const dispatch = useDispatch();
  const [body, setBody] = React.useState("");
  const params = useParams();

  const onBodyChange = (e) => setBody(e.target.value);

  const comentario = { id: params.id, body: body };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CommentAdd(comentario));
  };
  return (
    <div className="mt-5 overflow-y-auto">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        style={{
          borderRadius: "25px",
          boxShadow: "none",
          background: "#f6f6f6",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandCircleDownIcon style={{ color: "#64cd98" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className="mt-5"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            Comentarios
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <textarea
              rows="5"
              placeholder="Agregar un comentario"
              className="w-full outline-slate-400 rounded-xl p-2"
              value={body}
              onChange={onBodyChange}
            />
            <div className="w-full text-right">
              <button
                onSubmit={handleSubmit}
                className="bg-[#006191] p-2 text-white rounded-full"
              >
                Agregar
              </button>
            </div>
          </form>
          <ListComentarios />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
