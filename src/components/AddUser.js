import React from "react";

class AddUser extends React.Component {
    userAdd = {}
    constructor (props) {
        super (props)
        this.state = {
                firstname: "",
                lastname: "",
                email: "",
                avatar: null,
                DayNight: false
        }
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Преобразовать фотографию в строку base64
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    render () {
        return (
            <form ref={(el) => this.myForm = el}>
                <input placeholder="Имя" onChange={(e) => this.setState({ first_name: e.target.value })}/>
                <input placeholder="Фамилия" onChange={(e) => this.setState({ last_name: e.target.value })}/>
                <textarea placeholder="Эмаил" onChange={(e) => this.setState({ email: e.target.value })}></textarea>

                <div style={{ display: "flex", gap: "1vw",position: "relative", overflow: "hidden", width: "fit-content" }}>
                    <input type="file" accept="image/*" onChange={this.handleFileChange} style={{ position: "absolute", top: 0, left: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer"}}/>
                    <button>
                        Загрузить фотографию
                    </button>
                    <div>
                        <img src={this.state.avatar} style={{height: "55px", marginTop:"10px"}}/>
                    </div>
                </div>


                <label htmlFor="DayNight">Желаете выехать ночью?</label>
                <input type="checkbox" id="DayNight" onChange={(e) => this.setState({ DayNight: e.target.checked })}/>
                <button type="button" onClick={() => {
                    this.myForm.reset()
                    this.userAdd = {
                        first_name:this.state.first_name,
                        last_name:this.state.last_name,
                        email:this.state.email,
                        avatar:this.state.avatar,
                        DayNight:this.state.DayNight,
                    }
                    if (this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)
                }
                }>Добавить</button>  
            </form>
        )
    }
}

export default AddUser