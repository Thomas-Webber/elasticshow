import React, {Component} from 'react';
import { Menu, Icon, List, Typography, Divider} from 'antd';

const { Title, Paragraph, Text } = Typography;


export class HelpComponent extends Component<Props> {
  render() {
    const index_key = "has-avis-dm";
    return (
      <Typography>
        <Title>Centre d'aide aux client</Title>
        <Title level={3}>Table des matières </Title>
        <ul>
          {Object.keys(CONFIG.indexes).map(key => (
            <li><a href={'#' + key}>{CONFIG.indexes[key].title}</a></li>
          ))}
          
          <li><a href="#contact">Contact</a></li>
        </ul>
        <Divider />

        {Object.keys(CONFIG.indexes).map(index_key => (
          <>
          <Title level={1} id={index_key}>{CONFIG.indexes[index_key].title} </Title>
          <Title level={2}>Informations importantes</Title>
          {CONFIG.help[index_key].map(content => (
            <Paragraph>{content}</Paragraph>
          ))}

          <Title level={2}>Detail de chaque élément</Title>
          <List
            dataSource={Object.keys(CONFIG.indexes[index_key].fields)}
            size="large"
            renderItem={field_key => (
              <List.Item style={{paddingLeft: 0, marginLeft:0}}>
                <List.Item.Meta 
                  title={CONFIG.indexes[index_key].fields[field_key].title + " (" + field_key + ")"}
                  description={CONFIG.indexes[index_key].fields[field_key].description}
                />
                <br/>
              </List.Item>
            )}
          />
          <Divider />
          </>
        ))}
        
        <Title id="contact">Contact</Title>
        <Paragraph>
          Vous pouvez contacter notre centre de support :
          <ul>
            <li>pour des questions éventuelles sur le fonctionnement du produit,</li>
            <li>pour signaler un bug dans l'interface</li>
            <li>pour signaler une corruption de données,</li>
          </ul>
        </Paragraph>
        <Paragraph>
        Contactez-nous par email à l'adresse: <a href={'mailto:' + CONFIG.support_email}>{CONFIG.support_email}</a>. Nous répondons sous un jour ouvré.
        </Paragraph>
      </Typography>

    );
  }

}