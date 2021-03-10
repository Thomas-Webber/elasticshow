import React, {Component} from 'react';
import {List, Typography, Divider} from 'antd';
import {withTranslation} from 'react-i18next';

const { Title, Paragraph } = Typography;


class HelpComponent extends Component<Props> {
  render() {
    return (
      <Typography>
        <Title>{this.props.t('help.title')}</Title>
        <Title level={3}>{this.props.t('help.toc')}</Title>
        <ul>
          {Object.keys(CONFIG.indexes).map(key => (
            <li key={key}><a href={'#' + key}>{CONFIG.indexes[key].title}</a></li>
          ))}
          
          <li key={'contact'}><a href="#contact">{this.props.t('nav.contact')}</a></li>
        </ul>
        <Divider />

        {Object.keys(CONFIG.indexes).map(index_key => (
          <section key={index_key}>
          <Title level={1} id={index_key}>{CONFIG.indexes[index_key].title} </Title>
          <Title level={2}>{this.props.t('help.important')}</Title>
          {CONFIG.indexes[index_key].infos.map((content, i) => (
            <Paragraph key={i}>{content}</Paragraph>
          ))}

          <Title level={2}>{this.props.t('help.item_detail')}</Title>
          <List
            dataSource={Object.keys(CONFIG.indexes[index_key].fields)}
            size="large"
            renderItem={field_key => (
              <List.Item style={{paddingLeft: 0, marginLeft:0}} key={field_key}>
                <List.Item.Meta 
                  title={CONFIG.indexes[index_key].fields[field_key].title + " (" + field_key + ")"}
                  description={CONFIG.indexes[index_key].fields[field_key].help}
                />
                <br/>
              </List.Item>
            )}
          />
          <Divider />
          </section>
        ))}
        
        <Title id="contact">{this.props.t('nav.contact')}</Title>
        <Paragraph>
          {this.props.t('help.contact_title')}
          <ul>
            <li key={1}>{this.props.t('help.contact_title1')}</li>
            <li key={2}>{this.props.t('help.contact_title2')}</li>
            <li key={3}>{this.props.t('help.contact_title3')}</li>
          </ul>
        </Paragraph>
        <Paragraph >
          <span dangerouslySetInnerHTML={{
          __html: this.props.t('help.contact_line', {email: CONFIG.support_email})
        }}></span>
        </Paragraph>
      </Typography>
    );
  }
}

export default withTranslation()(HelpComponent);