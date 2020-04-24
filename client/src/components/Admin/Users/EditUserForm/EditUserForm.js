import React, {useState, useEffect, useCallback} from "react";
import {Avatar,Form,Input,Select,Button,Row,Col} from "antd";
import { useDropzone } from "react-dropzone";
import "./EditUserForm.scss";
import NoAvatar from "../../../../assets/img/png/avatar.png";
import { UserOutlined,MailOutlined,LockOutlined } from '@ant-design/icons';
import {getAvatarApi} from "../../../../api/user";


export default function EditUserForm(props) {
    const {user} = props;
    const [avatar,SetAvatar] = useState(null);
    const [userData, setUserData] = useState({});


    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar : user.avatar     
        });
    },[user]);

    useEffect(() => {
        if(user.avatar) {
            getAvatarApi(user.avatar).then(response => {
            })
        }else {
            SetAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if(avatar) {
            setUserData({...userData, avatar: avatar.file});
        }
    },[avatar]);

    const updateUser = e => {
        console.log(userData);
    }

    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} SetAvatar={SetAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}  />
        </div>
    );
}

function UploadAvatar(props) {
    const {avatar,SetAvatar} = props;
    const [avatarUrl,setAvatarUrl] = useState(null);

    useEffect(() => {
        if(avatar) {
            if(avatar.preview) {
                setAvatarUrl(avatar.preview);
            }else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);


    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            SetAvatar({file, preview: URL.createObjectURL(file)});
        }, [SetAvatar]
    );

    const {getRootProps, getInputProps,isDragActive} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}  >
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    )

}

function EditForm(props) {
    const {userData,setUserData,updateUser} = props;
    const { Option} = Select;

    return (
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined />}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({...userData, name: e.target.value})}
                        />                    
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input 
                            prefix={<UserOutlined />}
                            placeholder="Apellido"
                            value={userData.lastname}
                            onChange={e => setUserData({...userData, lastname: e.target.value})}
                        />                    
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input 
                            prefix={<MailOutlined />}
                            placeholder="Correo"
                            value={userData.email}
                            onChange={e => setUserData({...userData, email: e.target.value})}
                        />                    
                    </Form.Item>
                </Col>
                <Col span={12}>
                   <Form.Item>
                    <Select
                        placeholder="Seleccione un rol"
                        onChange={e => setUserData({ ...userData, role: e})}
                        value={userData.role}
                    >
                        <Option value="admin" >Administrador</Option>
                        <Option value="editor" >Editor</Option>
                        <Option value="reviewr" >Revisor</Option>

                    </Select>
                    </Form.Item> 
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Contraseña"
                            onChange={e =>
                                setUserData({...userData, password: e.target.value})
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input 
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder=" RepetirContraseña"
                            onChange={e =>
                                setUserData({...userData, repeatPassword: e.target.value})
                            }
                        />
                    </Form.Item>

                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit"  >
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}