import React from "react";
import './Measure.css';

export default function Measure() {
    return(
        <div className="measure">

            <div className="grid-container">

                <div className="block image measure-image">
                    <img src="./images/circ-corpo.png" alt="Circunferência do Corpo" className="image-measure" />
                </div>

                <div className="block text main-measure">
                    <h2>Principais Medidas</h2>
                    <p>Para encontrar o tamanho ideal, use uma fita métrica e meça seu corpo conforme indicado na imagem. Mantenha a fita justa, mas sem apertar, e anote as medidas principais. Isso ajudará a garantir um caimento perfeito para sua peça de crochê.</p>
                </div>

                <div className="block text table-measure">
                    <h2>Tabela de medidas</h2>
                    <p>Agora que você já tem suas medidas, consulte a tabela para encontrar o tamanho ideal. Caso fique entre dois tamanhos, escolha conforme sua preferência de ajuste: mais justo ou mais soltinho. Qualquer dúvida, estamos aqui para ajudar.</p>
                </div>

                <div className="block image table-image">
                    <img src="./images/tabela-medidas.png" alt="Tabela de Medidas" className="image-measure" />
                </div>
            </div>


        </div>
    );
}